
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUserFavorites } from "../features/favoriteSlice";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem("user");

    dispatch(loadUserFavorites());

    navigate("/login", { replace: true });
  }, [dispatch, navigate]);

  return null;
}

export default Logout;
