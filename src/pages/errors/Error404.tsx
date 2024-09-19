import React, { useEffect } from "react";
import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Error404: React.FC = () => {
  useEffect(() => {
    document.title = "Error404"
  }, [])
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[hsl(var(--background))]">
      <ErrorMessage />
    </div>
  );
}

const ErrorMessage: React.FC = () => {
  return (
    <Alert className="w-1/2">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Error 404</AlertTitle>
      <AlertDescription>
        Oops! The page you are looking for does not exist.
      </AlertDescription>
    </Alert>
  );
}

export default Error404;
