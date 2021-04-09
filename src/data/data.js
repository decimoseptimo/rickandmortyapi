const data = async (page=1) => {
  const response = await fetch("https://rickandmortyapi.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `query {
        characters(page: ${page}) {
          info {
            count
          }
          results {
            id
            name
            image
            status
            gender
            origin {
              name
            }
            location {
              name
            }
          }
        }
    }`,
    }),
  })
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  
  return await response.json()
}

export default data
