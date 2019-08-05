import React from 'react';
import SearchForm from '../../components/searchform/SearchForm';

const Search = ({APIkey}) => (
  <SearchForm onlySkyEng={false} APIkey={APIkey}/>
);

export default Search;
