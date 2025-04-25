import { GetData } from "@/constants/types";
import { fetchAPI } from "@/services/fetchAPI";
import { useEffect, useState, useCallback } from "react";

export const useFetch = (type: GetData) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to fetch data
  // Modified to use refetch for re-fetching data when swiping down, Duc Anh Apr 22 21:01
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let response = null;
      switch (type) {
        case 'orders':
          response = await fetchAPI.getOrders();
          break;
        case 'foods':
          response = await fetchAPI.getFood();
          break;
        case 'categories':
          response = await fetchAPI.getCategories();
          break;
        case 'tables':
          response = await fetchAPI.getTables();
          break;
        case 'combos':
          response = await fetchAPI.getCombos();
          break;
        default:
          console.error(`Error: Type '${type}' not found.`);
          return;
      }
      setData(response); // Set the fetched data
    } catch (err) {
      console.log('Error while fetching data: ', err);
    } finally {
      setLoading(false); // Turn off the loading state
    }
  }, [type]);

  // Fetch data on mount and whenever the type changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Return the data, loading, error, and refetch function
  return { data, loading, refetch: fetchData };

};
