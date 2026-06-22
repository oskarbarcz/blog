interface RoleBadgeProps {
  role: "guest" | "speaker" | "panelist" | "participant" | "organizer";
}

export default function RoleBadge({ role }: RoleBadgeProps) {
  const map: Record<
    RoleBadgeProps["role"],
    { label: string; classes: string }
  > = {
    guest: {
      label: "Gość",
      classes: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    },
    participant: {
      label: "Uczestnik",
      classes:
        "bg-brand-50 text-brand-700 dark:bg-brand-400/10 dark:text-brand-400",
    },
    speaker: {
      label: "Prelegent",
      classes:
        "bg-brand-50 text-brand-700 dark:bg-brand-400/10 dark:text-brand-400",
    },
    panelist: {
      label: "Panelista",
      classes:
        "bg-indigo-50 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-400",
    },
    organizer: {
      label: "Organizator",
      classes:
        "bg-red-50 text-red-700 dark:bg-indigo-400/10 dark:text-indigo-400",
    },
  };
  const cfg = map[role];
  return (
    <span
      className={`font-family-mono inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${cfg.classes}`}
    >
      {cfg.label}
    </span>
  );
}
