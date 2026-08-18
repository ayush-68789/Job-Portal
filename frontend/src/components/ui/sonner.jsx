import { Toaster as Sonner } from "sonner"

const Toaster = ({ ...props }) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg bg-white text-gray-900 border-gray-200",
          description: "group-[.toast]:text-muted-foreground text-gray-500",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground bg-[#6A38C2] text-white",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground bg-gray-100 text-gray-700",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
