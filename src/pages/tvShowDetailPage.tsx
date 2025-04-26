import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { TVShowDetail } from "../types/interfaces";
import { fetchTvShowDetail } from "../api/tmdb-api";
import PageTemplate from "../components/templateTvShowPage";
import Spinner from "../components/spinner";
import TvShowDetail from "../components/tvShowDetails";

const ShowDetailPage = () => {
  const { id } = useParams();
  const {
    data: show,
    error: showError,
    isLoading: showLoading,
    isError: showIsError,
  } = useQuery<TVShowDetail, Error>(["Tv show", id], () =>
    fetchTvShowDetail(id || "")
  );

  console.log(show);

  if (showLoading) {
    return <Spinner />;
  }

  if (showIsError) {
    return <h1>{showError?.message}</h1>;
  }

  return (
    <div>
      {show && (
        <PageTemplate show={show}>
          <TvShowDetail show={show} />
        </PageTemplate>
      )}
    </div>
  );
};

export default ShowDetailPage;
