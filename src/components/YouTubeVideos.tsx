import { useState } from "react";
import { Play } from "lucide-react";

const YouTubeVideos = () => {
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set());

  const videos = [
    {
      id: "UCkVaseVideo1",
      title: "Culte du Dimanche - Message Puissant",
      thumbnail: "https://img.youtube.com/vi/PLACEHOLDER/maxresdefault.jpg",
    },
    {
      id: "UCkVaseVideo2",
      title: "Grande Rencontre 2024",
      thumbnail: "https://img.youtube.com/vi/PLACEHOLDER/maxresdefault.jpg",
    },
    {
      id: "UCkVaseVideo3",
      title: "Succoth Milan - Moments de Gloire",
      thumbnail: "https://img.youtube.com/vi/PLACEHOLDER/maxresdefault.jpg",
    },
  ];

  const handleVideoClick = (videoId: string) => {
    setLoadedVideos((prev) => new Set(prev).add(videoId));
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-accent/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-divine bg-clip-text text-transparent">
            Nos Vidéos YouTube
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos cultes, enseignements et moments forts en vidéo
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="group relative rounded-2xl overflow-hidden shadow-royal hover:shadow-glow transition-all duration-300 animate-fade-in bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {!loadedVideos.has(video.id) ? (
                <div
                  className="relative cursor-pointer aspect-video"
                  onClick={() => handleVideoClick(video.id)}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-divine flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-divine">
                      <Play className="h-10 w-10 text-white ml-1" fill="white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-white font-semibold text-lg">{video.title}</h3>
                  </div>
                </div>
              ) : (
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Channel Link */}
        <div className="text-center mt-12">
          <a
            href="https://www.youtube.com/c/ÉgliseVasesdHonneur"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-divine text-white rounded-xl font-semibold hover:shadow-glow transition-all duration-300 transform hover:scale-105"
          >
            <Play className="h-5 w-5" />
            Visiter Notre Chaîne YouTube
          </a>
        </div>
      </div>
    </section>
  );
};

export default YouTubeVideos;
