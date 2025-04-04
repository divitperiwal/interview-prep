import { getCurrentUser } from "@/lib/actions/auth.actions";
import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.actions";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = getCurrentUser();
  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id,
  });

  return <div>Page</div>;
};

export default Page;
