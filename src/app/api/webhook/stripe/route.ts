import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { env } from "@/lib/env";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

export const POST = async (req: Request) => {
  const body = await req.text();

  const headersList = await headers();

  const signature = headersList.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    return new Response("Webhook verification failed", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status === "paid") {
      const courseId = session.metadata?.courseId;
      const customerId = session.customer as string;

      if (!courseId) {
        throw new Error("Course ID not found");
      }

      const user = await prisma.user.findUnique({
        where: {
          stripeCustomerId: customerId,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      await prisma.enrollment.update({
        where: {
          id: session.metadata?.enrollmentId as string,
        },
        data: {
          userId: user.id,
          courseId: courseId,
          amount: session.amount_total as number,
          status: "Active",
        },
      });

      return new Response("Enrollment updated", { status: 200 });
    }
  }
};
