// Fetch Data and Return array of Recipes

export async function Menu(query) {
  try {
    const fetched = await fetch(`api/${query}`);
    if (!fetched.ok) throw new Error("failed to find a recipe try again");
    const { data } = await fetched.json();
    return data;
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
  const markup = (
    <div
      href="#"
      onClick={() => {
        eventsForItems(recipe, props);
      }}
      data-id={recipe.recipe_id}
      className="catalogue__item link"
      key={recipe._id}>
      <img className="catalogue__item__image" src={recipe.image} alt="cake"></img>
      <div className="catalogue__item__info">
        <div className="catalogue__item__info-price">£ {recipe.price}</div>
        <div className="catalogue__item__info-name">{recipe.title}</div>
        <a
          href="#"
          className="catalogue__item__info-like"
          onClick={(e) => {
            e.stopPropagation();
            if (props.state.favouriteCakes.some((el) => el.title === recipe.title)) {
              const newBookmarks = props.state.favouriteCakes.filter((el) => el.title !== recipe.title);
              props.state.updateBookmark(newBookmarks);
            } else {
              const currentRecipe = eventsForItems(recipe, props, true);
              props.state.addBookmark(currentRecipe);
            }
          }}>
          {props.state.favouriteCakes.some((el) => el.title === recipe.title) ? props.heartFill : props.heartEmpty}
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
    image: recipe.image,
    id: recipe._id,
    bookmarked: trueFalse,
    price: recipe.price,
  };
  props.state.setMenuItem(currentRecipe);

  return currentRecipe;
}
