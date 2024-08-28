import './Tiles.css';

const Tiles = ({ items, type }) => {
    return (
        <div className='tiles-grid'>
            {items.map(item => (
                <div className='tile' key={item.id}>
                    {type === 'note' ? (
                        <>
                            <img src={item.url} alt={item.title} className='tile-image' />
                            <div className='tile-content'>
                                <h2>{item.title}</h2>
                                <p>{item.content ? item.content.substring(0, 100) : ''}....</p>
                                <p><em>last updated at: {new Date(item.updatedAt).toLocaleString()}</em></p>
                            </div>
                        </>
                    ) : type === 'character' ? (
                        <>
                            <img src={item.url} alt={item.name} className='tile-image' />
                            <div className='tile-content'>
                                <h2>{item.name}</h2>
                                <p><em>Last updated at: {new Date(item.updatedAt).toLocaleString()}</em></p>
                            </div>
                        </>
                    ) : null}
                </div>
            ))}
        </div>
    )
};

export default Tiles;
