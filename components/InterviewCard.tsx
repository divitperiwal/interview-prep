import { getRandomInterviewCover } from "@/lib/utils";
import dayjs from "dayjs";
import Image from "next/image";
import DisplayTechIcons from "./DisplayTechIcons";
import { getFeedbackByInterviewId } from "@/lib/actions/general.actions";
import LoadingLinkButton from "./LoadingLinkButton";

const InterviewCard = async ({
  id,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback =
    userId && id
      ? await getFeedbackByInterviewId({ interviewId: id, userId })
      : null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const fallbackDate = "1970-01-01T00:00:00.000Z";
  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || fallbackDate
  ).format("MMM D, YYYY");
  return (
    <div className="card-border w-full min-h-96 animate-fadeIn transition-all duration-300 hover:shadow-xl">
      <div className="card-interview">
        <div>
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-white/10 border-l border-b border-white/15 backdrop-blur-sm">
            <p className="badge-text text-xs font-medium">{normalizedType}</p>
          </div>
          <Image
            src={getRandomInterviewCover()}
            alt="cover"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px] ring-2 ring-white/10"
          />
          <h3 className="mt-5 capitalize text-white">{role} Interview</h3>

          <div className="flex flex-row gap-5 mt-4 text-sm text-muted-foreground">
            <div className="flex flex-row gap-2 items-center">
              <Image
                src="/calendar.svg"
                alt="calendar"
                width={16}
                height={16}
              />
              <p>{formattedDate}</p>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <Image src="/star.svg" alt="star" width={16} height={16} />
              <p>{feedback?.totalScore || "---"}/100</p>
            </div>
          </div>

          <p className="line-clamp-2 mt-5 text-sm leading-relaxed text-muted-foreground">
            {feedback?.finalAssessment ||
              "Take this interview to receive detailed feedback on your performance."}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center gap-4">
          <DisplayTechIcons techStack={techstack} />
          <LoadingLinkButton
            href={feedback ? `/interview/${id}/feedback` : `/interview/${id}`}
            className="btn-primary text-sm"
            loadingLabel="Opening..."
          >
            {feedback ? "View Feedback" : "Start"}
          </LoadingLinkButton>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
