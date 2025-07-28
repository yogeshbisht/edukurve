import Link from "next/link";
import React from "react";

const NotAdminPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">
        You are not authorized to <Link href="/">access</Link> this page
      </h1>
      <p className="text-sm text-gray-500">
        Please contact the administrator to get access.
      </p>
    </div>
  );
};

export default NotAdminPage;
