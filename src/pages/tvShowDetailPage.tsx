import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { TVShowDetail } from "../types/interfaces";
import {
  fetchTvShowDetails,
  fetchTvShowEpisodes,
} from "../api/tmdb-api";
import PageTemplate from "../components/templateTvShowPage";
import Spinner from "../components/spinner";
import TvShowDetail from "../components/tvShowDetails";
import { useState } from "react";

const ShowDetailPage = () => {
  const { id } = useParams();
  const [season, setSeason] = useState<number>(1);

  const {
    data: show,
    error: showError,
    isLoading: showLoading,
    isError: showIsError,
  } = useQuery<TVShowDetail, Error>(["tv-show-detail", id], () =>
    fetchTvShowDetails(id || "")
  );

  const {
    data: episodesData,
    isLoading: episodesLoading,
    isError: episodesIsError,
    error: episodesError,
  } = useQuery(
    ["tv-show-episodes", id, season],
    () => fetchTvShowEpisodes(id || "", season),
    {
      enabled: !!id && !!season,
    }
  );

  if (showLoading || episodesLoading) return <Spinner />;

  if (showIsError || episodesIsError)
    return (
      <h1>
        {(showError as Error)?.message || (episodesError as Error)?.message}
      </h1>
    );

  if (!show) return <h1>No show data found</h1>;

  return (
    <PageTemplate show={show}>
      <>
        <TvShowDetail show={show} />

        {/* 🎬 Season Selection Buttons */}
        <div className="mt-6 mb-4">
          <h2 className="text-xl font-semibold mb-2">Select Season</h2>
          <div className="flex flex-wrap gap-2">
            {show.seasons?.map((s) => (
              <button
                key={s.id}
                onClick={() => setSeason(s.season_number)}
                className={`px-3 py-1 border rounded ${
                  season === s.season_number
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black"
                }`}
              >
                Season {s.season_number}
              </button>
            ))}
          </div>
        </div>

        {/* 🎥 Episode List */}
        <h2 className="text-xl font-bold mt-6 mb-2">
          Episodes - Season {season}
        </h2>

        <div className="space-y-2">
          {episodesData?.episodes?.map((ep: any) => (
            <div
              key={ep.id}
              className="p-3 border rounded hover:bg-gray-100 cursor-pointer"
              onClick={() =>
                alert(
                  `Episode ${ep.episode_number}: ${ep.name}\n\n${ep.overview}`
                )
              }
            >
              <strong>
                S{ep.season_number}E{ep.episode_number}
              </strong>
              : {ep.name}
            </div>
          ))}
        </div>
      </>
    </PageTemplate>
  );
};

export default ShowDetailPage;
