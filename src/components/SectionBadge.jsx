import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const sectionBadgeClass =
  "h-auto rounded-full text-[0.62rem] tracking-[0.14em] uppercase !px-3 !pt-[0.45rem] !pb-[0.35rem] border-[#2d3a24]/35 text-[#2d3a24] w-fit leading-none mx-auto";

export default function SectionBadge({ children, className = "", ...props }) {
  return (
    <Badge
      variant="outline"
      className={cn(sectionBadgeClass, className)}
      {...props}
    >
      {children}
    </Badge>
  );
}

