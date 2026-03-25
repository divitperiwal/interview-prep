import InterviewCard from "@/components/InterviewCard";
import LoadingLinkButton from "@/components/LoadingLinkButton";
import {getCurrentUser} from "@/lib/actions/auth.actions";
import { getInterviewsByUserId, getLatestInterviews } from "@/lib/actions/general.actions";
import Image from "next/image";
import React from "react";

const Home = async () => {
  const user = await getCurrentUser();
  const userId = user?.id ?? "";
  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewsByUserId(userId),
    await getLatestInterviews({ userId }),
  ]);

  const hasPastInterviews = (userInterviews?.length ?? 0) > 0;
  const hasUpcomingInterviews = (latestInterviews?.length ?? 0) > 0;

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl">Get Interview Ready</h2>
            <p className="text-base text-muted-foreground">
              Practice on real interview questions with AI-powered feedback in real time
            </p>
          </div>
          <LoadingLinkButton href="/interview" className="btn-primary w-fit" loadingLabel="Opening...">
            Start an Interview
          </LoadingLinkButton>
        </div>

        <Image
          src={"/robot.png"}
          alt="robo-dude"
          width={320}
          height={320}
          className="max-md:hidden grayscale contrast-125 opacity-90"
        />
      </section>

      <section className="flex flex-col gap-4">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold">Your Interview History</h3>
          <p className="text-sm text-muted-foreground">Review past interviews and track your progress</p>
        </div>
        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 py-8 text-center col-span-full">
              <p className="text-sm text-muted-foreground">No interviews yet. Start your first one!</p>
            </div>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-4 pb-4">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold">Practice More Roles</h3>
          <p className="text-sm text-muted-foreground">Explore new interview scenarios from the community</p>
        </div>
        <div className="interviews-section">
        {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} userId={user?.id}/>
            ))
          ) : (
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 py-8 text-center col-span-full">
              <p className="text-sm text-muted-foreground">Check back soon for new interview scenarios</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
