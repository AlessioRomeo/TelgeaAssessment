"use client"

interface TopupOptionProps {
  title: string
  subtitle: string
  onClick: () => void
}

export default function TopupOption({ title, subtitle, onClick }: TopupOptionProps) {
  return (
      <button
          type="button"
          onClick={onClick}
          aria-label={`${title} ${subtitle}`}
          className="w-full flex items-center justify-center p-5 mb-2 bg-[#F6F5F4] border border-[#E9E7E2] rounded-2xl h-[130px]"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xl font-medium text-[#151515]">{title}</span>
          <span className="text-base font-medium text-[#151515] opacity-50">{subtitle}</span>
        </div>
      </button>
  )
}
