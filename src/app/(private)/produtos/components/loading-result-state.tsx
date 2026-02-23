"use client";
import Column from "@/src/components/core/column";
import { Progress } from "@/src/components/core/progress";
import { Brain, Calculator, CheckCircle2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface LoadingResultStateProps {
  onComplete: () => void;
}

const LoadingResultState = ({ onComplete }: LoadingResultStateProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const randomSteps = useMemo(() => {
    const totalDuration = Math.random() * (7000 - 3000) + 3000;
    const stepCount = loadingSteps.length;

    const randomWeights = Array.from({ length: stepCount }, () =>
      Math.random(),
    );
    const totalWeight = randomWeights.reduce((sum, weight) => sum + weight, 0);

    return loadingSteps.map((step, index) => ({
      ...step,
      duration: (randomWeights[index] / totalWeight) * totalDuration,
    }));
  }, []);

  const CurrentIcon =
    currentStep < randomSteps.length
      ? randomSteps[currentStep].icon
      : CheckCircle2;

  const currentMessage =
    currentStep < randomSteps.length
      ? randomSteps[currentStep].message
      : "Concluído!";

  const progress = ((currentStep + 1) / randomSteps.length) * 100;

  useEffect(() => {
    if (currentStep >= randomSteps.length) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, randomSteps[currentStep].duration);

    return () => clearTimeout(timer);
  }, [currentStep, onComplete, randomSteps]);

  return (
    <Column className="items-center justify-center max-w-md w-full h-full self-center space-y-8">
      <CurrentIcon className="w-16 h-16 text-primary animate-pulse" />
      <p className="text-xl font-medium text-center text-primary">
        {currentMessage}
      </p>
      <Progress value={progress} className="h-3 [&>div]:bg-primary" />
    </Column>
  );
};

export default LoadingResultState;

const loadingSteps = [
  {
    id: 1,
    message: "IA está analisando o produto...",
    icon: Brain,
  },
  {
    id: 2,
    message: "IA está calculando resultados...",
    icon: Calculator,
  },
  {
    id: 3,
    message: "Finalizando análise...",
    icon: CheckCircle2,
  },
];
