import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchActorDetails } from "../api/tmdb-api";
import { ActorsDetails } from "../types/interfaces";

import Spinner from "../components/spinner";

import TemplateActorPage from "../components/templateActorDetailPage";
import ActorDetails from "../components/actorDetails";

const ActorDetailsPage: React.FC = () => {
  const { id } = useParams();
  const {
    data: actor,
    error,
    isLoading,
    isError,
  } = useQuery<ActorsDetails, Error>(["actor", id], () =>
    fetchActorDetails(id || "")
  );

  if (isLoading) return <Spinner />;
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      {actor && (
        <TemplateActorPage actor={actor}>
          <ActorDetails actor={actor} />
        </TemplateActorPage>
      )}
    </div>
  );
};

export default ActorDetailsPage;
