const Search = ({ onOpenModal }) => {
    const open = ()=>{
        onOpenModal(true)
    }
    return (
        <div className="search_form">
            <input id="search" />

            <div className="search_icon" onClick={open} style={{ cursor: "pointer" }}>
                <span className="mx-auto">Recherche</span>
            </div>
        </div>
    );
};

export default Search;

