

/**

A component that displays a search result of a track.

@param {Object} props - The props that are passed to this component.

@param {Object} props.track - The track object that contains information about the track.

@param {function} props.chooseTrack - A function that is called when the user selects the track.

@param {string} props.albumUrl - The URL of the album cover image.

@returns {JSX.Element} - The JSX element that represents the TrackSearchResult component.
/
function TrackSearchResult({ track, chooseTrack, albumUrl }) {
/*

Handles the click event of the component, calling the chooseTrack function
with the URI of the selected track.
*/
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