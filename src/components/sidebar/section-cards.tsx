import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { adminGetDashboardStats } from "@/data/admin/admin-get-dashboard-stats";
import {
  IconBook,
  IconPlaylistX,
  IconShoppingCart,
  IconUsers,
} from "@tabler/icons-react";

type SectionCard = {
  title: string;
  value: number;
  description: string;
  icon?: React.JSX.ElementType;
};

const SectionCards = async () => {
  const data = await adminGetDashboardStats();
  const { totalSignUps, totalCustomers, totalCourses, totalLessons } = data;

  const cardData: SectionCard[] = [
    {
      title: "Total Signups",
      value: totalSignUps,
      description: "Registered users on the platform",
      icon: IconUsers,
    },
    {
      title: "Total Customers",
      value: totalCustomers,
      description: "Total customers on the platform",
      icon: IconShoppingCart,
    },
    {
      title: "Total Courses",
      value: totalCourses,
      description: "Available courses on the platform",
      icon: IconBook,
    },
    {
      title: "Total Lessons",
      value: totalLessons,
      description: "Total learning content available",
      icon: IconPlaylistX,
    },
  ];

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cardData.map((item) => (
        <Card className="@container/card" key={item.title}>
          <CardHeader className="flex items-center justify-between space-y-0 pb-2">
            <div>
              <CardDescription>{item.title}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {item.value}
              </CardTitle>
            </div>
            {item.icon && (
              <item.icon className="size-6 text-muted-foreground" />
            )}
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <p className="text-muted-foreground">{item.description}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SectionCards;
