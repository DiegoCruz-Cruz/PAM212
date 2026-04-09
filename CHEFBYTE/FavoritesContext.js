// FavoritesContext.js
import React, { createContext, useState } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // ⭐ Agregar favorito con nota
  const addFavorite = (recipe, nota = "") => {
    const exists = favorites.some(r => r.id === recipe.id);
    if (exists) return;

    setFavorites([...favorites, {
      id: recipe.id,
      nombre: recipe.nombre,
      tiempo: recipe.tiempo,
      imagen: recipe.imagen,
      descripcion: recipe.descripcion,
      nota: nota
    }]);
  };

  // ⭐ Quitar o agregar sin nota
  const toggleFavorite = (recipe) => {
    const exists = favorites.some(r => r.id === recipe.id);

    if (exists) {
      setFavorites(favorites.filter(r => r.id !== recipe.id));
    } else {
      setFavorites([
        ...favorites,
        {
          id: recipe.id,
          nombre: recipe.nombre,
          tiempo: recipe.tiempo,
          imagen: recipe.imagen,
          descripcion: recipe.descripcion,
          nota: "" // sin nota
        }
      ]);
    }
  };

  // ⭐ Editar nota
  const editFavoriteNote = (id, nuevaNota) => {
    setFavorites(favorites.map(r =>
      r.id === id ? { ...r, nota: nuevaNota } : r
    ));
  };

  // ⭐ Eliminar favorito
  const removeFavorite = (id) => {
    setFavorites(favorites.filter(r => r.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      toggleFavorite,
      addFavorite,
      editFavoriteNote,
      removeFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};
