function TrackSearchResult({ track, chooseTrack, albumUrl }) {
    function handlePlay() {
        chooseTrack(track.uri);
    }

    return (
        <div className="w-full h-auto" onClick={handlePlay}>
            <img className="w-full h-auto object-cover" src={albumUrl} alt={track.title} />
            <div className="px-2 py-1">
                <div className="text-sm font-medium">{track.title}</div>
                <div className="text-xs text-gray-400">{track.artist}</div>
            </div>
        </div>
    );
}
export default TrackSearchResult;