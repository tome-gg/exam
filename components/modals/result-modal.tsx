import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useModalStore from "@/hooks/useModalStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RxLink2 } from "react-icons/rx";
import { BiHappyHeartEyes } from "react-icons/bi";
import * as Avatar from '@radix-ui/react-avatar';
import * as Progress from '@radix-ui/react-progress';

type Contributor = {
  name: string;
  role: string;
  imageUrl: string;
  externalUrl?: string;
}

const getInitials = (name: string) => { 
  if (name.includes("others")) 
    return name
    .split(" ")
    .filter((_, i) => i < 1)
    .reduce((n, c) => `${n}${c.charAt(0)}`, "")
  return name
    .split(" ")
    .filter((_, i) => i < 2)
    .reduce((n, c) => `${n}${c.charAt(0)}`, "");
}

const ContributorElement = (props : { contributor: Contributor}) => {

  const ExternalLinkComponent = () => {
    if (props.contributor.externalUrl) {
      return (
        <>
          <div className="relative w-1/6 h-12 cursor-pointer my-2 mx-4 rounded-full transition transition-colors transition-duration-1000 hover:bg-gray-100">
            <RxLink2 className="absolute bottom-3 right-1 w-10 h-6 text-2xl" />
          </div>
        </>
      )
    } else {
      return (
        <div className="w-1/6"></div>
      )
    }
  }

  return (
    <div className="flex flex-cols-2 text-left">
      <Avatar.Root className="rounded-full bg-gray-400 w-1/6 aspect-square m-2">
        <Avatar.Image
          className="rounded-full object-cover aspect-square"
          src={props.contributor.imageUrl}
          alt={props.contributor.name}
        />
        <Avatar.Fallback className="AvatarFallback aspect-square" delayMs={600}>
          <div
          className="rounded-full flex flex-row h-full aspect-square"
          >
            <span className="align-center justify-center text-center text-sm w-fit h-fit m-auto">{getInitials(props.contributor.name)}</span>
          </div>
        </Avatar.Fallback>
      </Avatar.Root>
      <div className="flex flex-col align-center justify-center m-2 w-4/6">
        <span className="text-base">{props.contributor.name}</span>
        <p className="text-gray-400 text-xs">{props.contributor.role}</p>
      </div>
      <ExternalLinkComponent />
    </div>
  )
}

const ResultModal = () => {
  const { 
    isOpen, type, onClose, additionalData,
    progress, progressRate, setProgress, 
    gratitudeVisible, contributorsVisible, smileyVisible, setVisibility, 
  } = useModalStore();
  const open = isOpen && type === "showResults";
  const router = useRouter();

  const contributors : Contributor[] = [
    {
      name: "John Smith",
      imageUrl: "/profile-1.jpeg",
      role: "Quiz Author",
      externalUrl: "some url"
    },
    {
      name: "Angela Doerthy",
      imageUrl: "/profile-2.jpeg",
      role: "Quiz Editor"
    },
    {
      name: "Luan Queros",
      imageUrl: "/profile-3.jpeg",
      role: "Quiz Editor"
    },
    {
      name: "Jacob, and others",
      imageUrl: "",
      role: "Contributors"
    }
  ]

  const gratitudeClassBase = 'text-center sm:text-left text-sm w-5/6 mx-auto sm:mr-auto transition transition-opacity ease-in-out duration-1000 opacity-0'
  const gratitudeClassReveal = 'text-center sm:text-left text-sm w-5/6 mx-auto sm:mr-auto transition transition-opacity ease-in-out duration-1000 opacity-100'
  

  const smileyThanksBase = 'text-center sm:text-left relative w-1/6 h-12 mb-2 mx-auto sm:h-fit transition transition-opacity ease-in-out duration-1000 opacity-0'
  const smileyThanksReveal = 'text-center sm:text-left relative w-1/6 h-12 mb-2 mx-auto sm:h-fit transition transition-opacity ease-in-out duration-1000 opacity-100'
  

  const contributorsBase = 'text-center sm:text-left bg-gray-200 s w-full h-fit rounded transition transition-opacity ease-in-out duration-1000 opacity-0'
  const contributorsReveal = 'text-center sm:text-left bg-gray-200 w-full h-fit rounded transition transition-opacity ease-in-out duration-1000 opacity-100'

  const onLeave = () => {
    setVisibility(false, false, false);
    setProgress(0, 0);
    router.push("/");
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded">
        <DialogHeader>
          <DialogTitle className="text-center text-xl md:text-2xl">
            Results
          </DialogTitle>
          <Separator className="my-2" />
          <div>
            <div className="flex items-center flex-col my-4">
              <div id="progress-score" className="w-5/6 mx-auto sm:mr-auto ">
                <p className="text-xs text-primary font-semibold tracking-wide mb-2">
                  You scored {progressRate.toFixed(0)}%!{" "}
                  <span className="text-gray-400 ">{` (${additionalData?.score}/${additionalData?.limit})`} questions</span>
                </p>
                <Progress.Root className="ProgressRoot" value={progress} max={additionalData?.limit}>
                <Progress.Indicator
                  className="ProgressIndicator"
                  style={{ transform: `translateX(${progressRate}%)` }}
                />
              </Progress.Root>
              <p className="text-xs text-gray-400 mt-2 italic">Your scores have been recorded.</p>
              </div>
              <div className="flex my-4 sm:my-4 sm:mb-4 flex-col sm:flex-row w-full">
                <div className="flex flex-col">
                  <p className={gratitudeVisible ? gratitudeClassReveal : gratitudeClassBase}>
                    Thank you! Your participation in 
                    this quiz has rewarded the following contributors!
                  </p>
                </div>
                <div className={smileyVisible ? smileyThanksReveal : smileyThanksBase}>
                  <span className="text-xs text-white bg-gray-700 rounded p-2 absolute top-2 sm:-top-9 right-0 animate-bounce">Thanks!</span>
                    <BiHappyHeartEyes className="mx-auto text-2xl animate-bounce text-black absolute -bottom-4 sm:top-0 right-5" />
                </div>
              </div>
              <div className={contributorsVisible ? contributorsReveal : contributorsBase}>
                {contributors.map(contributor => (
                  <ContributorElement key={contributor.name} contributor={contributor}></ContributorElement>
                ))}
              </div>
              <Button
                onClick={onLeave}
                className="mt-3 md:mt-5"
              >
                Play Again
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ResultModal;
