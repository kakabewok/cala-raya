"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Settings,
  Users,
  Send,
  LineChart,
  ChevronRight,
  X,
  Smartphone,
  Copy,
  Upload,
  UserPlus,
  ArrowRight,
  MousePointer2,
  ChevronLeft
} from "lucide-react";

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  {
    title: "Setup Message",
    icon: <Settings className="w-5 h-5 text-purple-600" />,
    description: "Prepare your wedding announcement",
    points: [
      "Navigate to the 'Share Invitation' menu item in your sidebar.",
      "Customize your message template to match your preferred wedding style.",
      "Personalize the greeting (e.g., 'Dear [Guest Name]') to make it feel more intimate.",
      "Make sure to save your changes to update the global template."
    ],
    color: "bg-purple-50 dark:bg-purple-900/20",
    iconColor: "text-purple-600",
    gradient: "from-purple-500 to-indigo-600"
  },
  {
    title: "Add Guests",
    icon: <Users className="w-5 h-5 text-blue-600" />,
    description: "Building your digital guest list",
    points: [
      "Upload Excel (.xlsx) file to quickly add hundreds of guests at once.",
      "Add guests manually one by one for last-minute additions or single invites.",
      "Our system automatically validates data and checks for duplicate entries.",
      "You can edit guest details anytime before or after sharing."
    ],
    color: "bg-blue-50 dark:bg-blue-900/20",
    iconColor: "text-blue-600",
    gradient: "from-blue-500 to-cyan-600"
  },
  {
    title: "Share Invitation",
    icon: <Send className="w-5 h-5 text-emerald-600" />,
    description: "Spread the joyful news to your loved ones",
    points: [
      "The system generates a unique, personalized link for every single guest.",
      "Copy individual links to send manually via your favorite messaging apps.",
      "Use the 'Direct WhatsApp' button for the fastest sharing experience.",
      "Preview what your guest will see before you hit send."
    ],
    color: "bg-emerald-50 dark:bg-emerald-900/20",
    iconColor: "text-emerald-600",
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    title: "Monitor RSVP",
    icon: <LineChart className="w-5 h-5 text-amber-600" />,
    description: "Keep track of your wedding attendance",
    points: [
      "Go to the 'RSVP' dashboard to see real-time guest responses.",
      "Monitor attendance counts, dietary requirements, and special messages.",
      "Filter guests by 'Attending', 'Declined', or 'No Response' status.",
      "Export your final guest list for catering and seating arrangements."
    ],
    color: "bg-amber-50 dark:bg-amber-900/20",
    iconColor: "text-amber-600",
    gradient: "from-amber-500 to-orange-600"
  }
];

export const TutorialModal: React.FC<TutorialModalProps> = ({ isOpen, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);

  // Reset step when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveStep(0);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[92vw] md:max-w-4xl lg:max-w-5xl p-0 overflow-hidden border border-border shadow-lg rounded-xl md:rounded-2xl bg-card flex flex-col max-h-[85vh] md:max-h-[90vh]">
        {/* Sticky Header */}
        <DialogHeader className="p-5 md:p-8 bg-card border-b border-border relative flex-shrink-0">
          <div className="flex items-center gap-4 md:gap-5">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-muted flex items-center justify-center border border-border">
              <MousePointer2 className="w-6 h-6 md:w-7 md:h-7 text-foreground" />
            </div>
            <div>
              <DialogTitle className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">Master Your Invitations</DialogTitle>
              <DialogDescription className="text-muted-foreground mt-1 text-sm md:text-base">
                Follow this professional guide to get the most out of our platform
              </DialogDescription>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        {/* Mobile Step Indicator - Only Mobile */}
        <div className="md:hidden flex items-center justify-between px-5 py-3 bg-muted/30 border-b border-border">
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 transition-all rounded-full ${activeStep === i ? "w-6 bg-foreground" : "w-1.5 bg-border"}`}
              />
            ))}
          </div>
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Step {activeStep + 1} of {steps.length}
          </span>
        </div>

        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Step Navigation - Sidebar (Hidden on Mobile) */}
          <div className="hidden md:flex w-72 bg-muted/20 border-r border-border p-6 space-y-2 flex-col overflow-y-auto">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-full flex items-center gap-4 p-3 rounded-md transition-colors text-left group border ${activeStep === index
                    ? "bg-background border-border shadow-sm"
                    : "border-transparent hover:bg-muted/50"
                  }`}
              >
                <div className={`w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${activeStep === index
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground group-hover:bg-background group-hover:border-border group-hover:border"
                  }`}>
                  {React.cloneElement(step.icon as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
                    className: `w-5 h-5 ${activeStep === index ? "text-background" : "text-muted-foreground group-hover:text-foreground"}`
                  })}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[11px] font-bold uppercase tracking-wider mb-0.5 ${activeStep === index ? "text-foreground" : "text-muted-foreground"}`}>
                    Step {index + 1}
                  </p>
                  <p className={`text-sm font-semibold leading-tight truncate ${activeStep === index ? "text-foreground" : "text-muted-foreground"}`}>
                    {step.title}
                  </p>
                </div>
                {activeStep === index && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
              </button>
            ))}

            <div className="mt-8 p-5 rounded-md bg-muted border border-border">
              <h5 className="text-xs font-bold text-foreground uppercase tracking-widest mb-2">Pro Tip</h5>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Always test your invitation link on your own phone before sharing with guests!
              </p>
            </div>
          </div>

          {/* Current Step Content */}
          <div className="flex-1 p-5 md:p-10 overflow-y-auto custom-scrollbar bg-card">
            <div className="max-w-2xl mx-auto">
              <div className="mb-8 md:mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex items-center justify-between mb-6 md:hidden">
                  <div className={`w-12 h-12 rounded-md bg-muted flex items-center justify-center border border-border`}>
                    {React.cloneElement(steps[activeStep].icon as React.ReactElement<React.ComponentPropsWithoutRef<"svg">>, {
                      className: "w-6 h-6 text-foreground"
                    })}
                  </div>
                  <div className="text-right">
                    <span className={`text-4xl font-bold opacity-10 text-foreground`}>0{activeStep + 1}</span>
                  </div>
                </div>

                <div className={`hidden md:flex w-16 h-16 rounded-md bg-muted flex items-center justify-center mb-6 border border-border`}>
                  {React.cloneElement(steps[activeStep].icon as React.ReactElement<React.ComponentPropsWithoutRef<"svg">>, {
                    className: "w-8 h-8 text-foreground"
                  })}
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-2">{steps[activeStep].title}</h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{steps[activeStep].description}</p>
              </div>

              <div className="space-y-4 md:space-y-5 mb-10 md:mb-12">
                {steps[activeStep].points.map((point, i) => (
                  <div key={i} className="flex items-start gap-4 md:gap-5 animate-in fade-in slide-in-from-left-4" style={{ animationDelay: `${i * 150}ms` }}>
                    <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-foreground opacity-60" />
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>

              {/* Enhanced Visual Aids - Responsive Grid */}
              {(activeStep === 1 || activeStep === 2) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 animate-in zoom-in-95 duration-700 delay-300">
                  <div className="group p-5 md:p-6 rounded-md bg-muted/30 border border-border transition-colors hover:bg-muted/50">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-md bg-background border border-border flex items-center justify-center mb-3 md:mb-4">
                      {activeStep === 1 ? <Upload className="w-5 h-5 md:w-6 md:h-6 text-foreground" /> : <Copy className="w-5 h-5 md:w-6 md:h-6 text-foreground" />}
                    </div>
                    <p className="text-[9px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Method One</p>
                    <h4 className="text-base font-semibold text-foreground mb-1">{activeStep === 1 ? "Bulk Upload" : "Manual Link"}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {activeStep === 1 ? "Import entire lists from Excel files instantly." : "Copy individual links to share on any platform."}
                    </p>
                  </div>
                  <div className="group p-5 md:p-6 rounded-md bg-muted/30 border border-border transition-colors hover:bg-muted/50">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-md bg-background border border-border flex items-center justify-center mb-3 md:mb-4">
                      {activeStep === 1 ? <UserPlus className="w-5 h-5 md:w-6 md:h-6 text-foreground" /> : <Smartphone className="w-5 h-5 md:w-6 md:h-6 text-foreground" />}
                    </div>
                    <p className="text-[9px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Method Two</p>
                    <h4 className="text-base font-semibold text-foreground mb-1">{activeStep === 1 ? "Individual Add" : "WhatsApp Direct"}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {activeStep === 1 ? "Add single guests manually for finer control." : "Send personalized invites directly to WhatsApp."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sticky Footer - Mobile-Optimized */}
        <DialogFooter className="p-5 md:p-6 border-t border-border bg-card sm:justify-between items-center gap-4 flex-shrink-0">
          <div className="hidden sm:flex items-center gap-6">
            <div className="flex gap-1.5">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 transition-all rounded-full ${activeStep === i ? "w-8 bg-foreground" : "w-2 bg-border"}`}
                />
              ))}
            </div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
              Progress: {Math.round(((activeStep + 1) / steps.length) * 100)}%
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {activeStep > 0 && (
              <Button
                variant="outline"
                onClick={() => setActiveStep(activeStep - 1)}
                className="flex-1 sm:hidden rounded-sm h-10"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            )}
            <Button
              variant="outline"
              onClick={onClose}
              className={`flex-1 sm:flex-none rounded-sm h-10 md:h-10 px-6 ${activeStep > 0 ? 'hidden md:flex' : 'flex'}`}
            >
              {activeStep === 0 ? "Skip" : "Close"}
            </Button>
            {activeStep < steps.length - 1 ? (
              <Button
                onClick={() => setActiveStep(activeStep + 1)}
                className="flex-1 sm:flex-none bg-foreground hover:bg-foreground/90 text-background rounded-sm h-10 md:h-10 px-8 group transition-colors"
              >
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={onClose}
                className="flex-1 sm:flex-none bg-foreground hover:bg-foreground/90 text-background rounded-sm h-10 md:h-10 px-10 transition-colors"
              >
                Got it!
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TutorialModal;
