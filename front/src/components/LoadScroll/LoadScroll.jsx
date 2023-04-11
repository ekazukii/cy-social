import React, { useState, useEffect } from 'react';

function LoadScroll() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    fetchItems(page).then(newItems => {
      setItems(prevItems => [...prevItems, ...newItems]);
      setIsLoading(false);
    });
  }, [page]);

  function fetchItems(page) {
    // Appel à l'API pour récupérer les éléments correspondants à la page demandée
    // Renvoie une promesse résolue avec les éléments chargés
  }

  function handleScroll(event) {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

    if (scrollHeight - scrollTop === clientHeight && !isLoading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  }

  return (
    <div onScroll={handleScroll}>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      {isLoading && <p>Chargement en cours...</p>}
      {!hasMore && <p>Fin de la liste</p>}
    </div>
  );
}

export default LoadScroll;