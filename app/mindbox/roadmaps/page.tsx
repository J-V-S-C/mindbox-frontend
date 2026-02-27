"use client";

import { GET_ROADMAPS } from "@/app/lib/queries";
import { useQuery } from "@apollo/client/react";

export default function Roadmaps() {
  const { data, loading, error } = useQuery(GET_ROADMAPS, {
    variables: { limit: 10, offset: 0 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data?.roadmaps.map((roadmap) => (
        <li key={roadmap.id}>{roadmap.name}</li>
      ))}
    </ul>
  );
}
