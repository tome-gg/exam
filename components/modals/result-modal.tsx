import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useModalStore from "@/hooks/useModalStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RxLink2 } from "react-icons/rx";
import { BiHappyHeartEyes } from "react-icons/bi";

const ResultModal = () => {
  const { isOpen, type, onClose, additionalData } = useModalStore();
  const open = isOpen && type === "showResults";
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-xl md:text-2xl">
            Results
          </DialogTitle>
          <Separator className="my-2" />
          <DialogDescription>
            <div className="flex items-center flex-col my-4 md:py-10 lg:py-12">
              <h3 className="text-lg md:2xl text-primary font-semibold tracking-wide">
                You scored:{" "}
                {`${additionalData?.score}/${additionalData?.limit}`}{" "}
              </h3>
              <div className="flex my-4">
                <p className="text-xs w-5/6">
                  Thank you for playing this quiz! Your participation contributes
                  to the innovation of education platforms rewarding teachers, 
                  educators, quality maintainers, coaches, and mentors!
                </p>
                <div className="text-right relative w-1/6">
                  <span className="text-xs text-white bg-rose-300 rounded p-2 absolute -top-9 right-0 animate-bounce">Thanks!</span>
                    <BiHappyHeartEyes className="mx-auto text-3xl animate-bounce text-rose-300 absolute right-0" />
                </div>
              </div>
              <div className="bg-gray-200 w-full h-fit rounded">
              <div className="flex flex-cols-2 text-left">
                  <div className="rounded-full bg-gray-400 h-12 w-12 m-2"></div>
                  <div className="flex flex-col align-center justify-center m-2 w-80">
                    <h4>John Smith</h4>
                    <p className="text-gray-400 text-xs">Quiz Author</p>
                  </div>
                  <div className="w-12 h-12 cursor-pointer text-2xl justify-center m-2 w-6">
                    <RxLink2 className="m-auto w-6 h-12" />
                  </div>
                </div>
                <div className="flex flex-cols-2 text-left">
                <div className="rounded-full bg-gray-400 h-12 w-12 m-2"></div>
                  <div className="flex flex-col align-center justify-center m-2 w-80">
                    <h4>Jonathan Groff and Lin Manuel Miranda</h4>
                    <p className="text-gray-400 text-xs">Quiz Editors</p>
                  </div>
                  <div className="w-12 h-12 cursor-pointer text-2xl justify-center m-2 w-6">
                    <RxLink2 className="m-auto w-6 h-12" />
                  </div>
                </div>
                <div className="flex flex-cols-2 text-left">
                  <div className="rounded-full bg-gray-400 h-12 w-12 m-2"></div>
                  <div className="flex flex-col align-center justify-center m-2 w-80">
                  <h4>Angel, Keenan, Michael, and others</h4>
                    <p className="text-gray-400 text-xs">Reviewers</p>
                  </div>
                  <div className="w-12 h-12 cursor-pointer text-2xl justify-center m-2 w-6">
                    <RxLink2 className="m-auto w-6 h-12" />
                  </div>
                </div>
              </div>
              <Button
                onClick={() => {
                  router.push("/");
                  onClose();
                }}
                className="mt-3 md:mt-5"
              >
                Play Again
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ResultModal;
