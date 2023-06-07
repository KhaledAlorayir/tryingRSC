"use client";

export default function error({ error }: { error: Error }) {
  return <div className="text-center font-semibold">{error.message}</div>;
}
