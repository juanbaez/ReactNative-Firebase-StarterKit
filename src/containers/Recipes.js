import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class RecipeListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: false,
    };
  }


  componentDidMount = () => this.fetchData();

  fetchData = (data) => {
    const { fetchRecipes, fetchMeals } = this.props;

    this.setState({ loading: true });

    return fetchRecipes(data)
      .then(() => fetchMeals())
      .then(() => this.setState({
        loading: false,
        error: null,
      })).catch((err) => this.setState({
        loading: false,
        error: err,
      }));
  }

  render = () => {
    const { Layout, recipes, match } = this.props;
    const { loading, error } = this.state;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    return (
      <Layout
        recipeId={id}
        error={error}
        loading={loading}
        recipes={recipes}
        reFetch={() => this.fetchData()}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  recipes: state.recipes.recipes || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchMeals: dispatch.recipes.getMeals,
  fetchRecipes: dispatch.recipes.getRecipes,
});

RecipeListing.propTypes = {
  Layout: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  // TODO:
  // verificar tipo de proptype de id
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }),
  fetchRecipes: PropTypes.func.isRequired,
  fetchMeals: PropTypes.func.isRequired,
};

RecipeListing.defaultProps = {
  match: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeListing);
