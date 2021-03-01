// Fetch Data and Return array of Recipes

export async function Menu(query) {
  try {
    const data = await fetch(
      `https://forkify-api.herokuapp.com/api/search?q=${query}`
    );
    if (!data.ok) throw new Error("failed to find a recipe try again");
    const { recipes } = await data.json();
    return recipes;
  } catch (err) {
    throw err;
  }
}

//Render Menu
export async function RenderMenu(recipes, props) {
  let data = recipes.map((el) => createMarkup(el, props));
  return data;
}

// Create Markup
function createMarkup(recipe, props) {
  const randomPrice = Math.ceil(Math.random() * (28 - 30)) + 28;
  const markup = (
    <div
      href="#"
      onClick={() => {
        eventsForItems(recipe, props);
      }}
      data-id={recipe.recipe_id}
      className="catalogue__item link"
      key={recipe.recipe_id}
    >
      <img className="catalogue__item__image" src={recipe.image_url}></img>
      <div className="catalogue__item__info">
        <div className="catalogue__item__info-price">£{randomPrice}.99</div>
        <div className="catalogue__item__info-name">{recipe.title}</div>
        <a
          href="#"
          className="catalogue__item__info-like"
          onClick={(e) => {
            e.stopPropagation();
            if (
              props.state.favouriteCakes.some((el) => el.title === recipe.title)
            ) {
              const newBookmarks = props.state.favouriteCakes.filter(
                (el) => el.title !== recipe.title
              );
              props.state.updateBookmark(newBookmarks);
            } else {
              const currentRecipe = eventsForItems(recipe, props, true);
              props.state.addBookmark(currentRecipe);
            }
          }}
        >
          {props.state.favouriteCakes.some((el) => el.title === recipe.title)
            ? props.heartFill
            : props.heartEmpty}
        </a>
      </div>
    </div>
  );

  return markup;
}

//Function
function eventsForItems(recipe, props, trueFalse) {
  const currentRecipe = {
    title: recipe.title,
    image_url: recipe.image_url,
    recipe_id: recipe.recipe_id,
    bookmarked: trueFalse,
  };
  props.state.setMenuItem(currentRecipe);

  return currentRecipe;
}
