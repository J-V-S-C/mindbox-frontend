"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  CREATE_ROADMAP,
  GET_ROADMAPS,
} from "@/app/lib/queries/roadmap-queries";
import { CreateRoadmapModal } from "@/app/components/roadmaps/CreateRoadmalModal";
import { ShowRoadmaps } from "@/app/components/roadmaps/ShowRoadmaps";

export default function RoadmapsPage() {
  const [showModal, setShowModal] = useState(false);

  // Hooks must always be called at the top level — never inside handlers
  const { data, loading, error } = useQuery(GET_ROADMAPS, {
    variables: { limit: 20, offset: 0 },
  });

  const [createRoadmap, { loading: creating }] = useMutation(CREATE_ROADMAP, {
    refetchQueries: [GET_ROADMAPS],
  });

  const handleCreate = async (name: string, description: string) => {
    await createRoadmap({
      variables: {
        input: { name, description: description || null },
      },
    });
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <CreateRoadmapModal
          onClose={() => setShowModal(false)}
          onSubmit={handleCreate}
          loading={creating}
        />
      )}
      <ShowRoadmaps
        roadmaps={data?.roadmaps ?? []}
        loading={loading}
        error={error}
        onNewClick={() => setShowModal(true)}
      />{" "}
    </>
  );
}
