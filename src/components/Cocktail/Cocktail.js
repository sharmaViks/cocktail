import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { Search } from "@material-ui/icons";
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#ededed"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    cocktailImage: {
        maxWidth: "100%",
        height: "auto"
    },
    cocktailCard: {
        display: "flex",
        padding: 10
    },
    cocktailCard_responsive: {
        padding: 10
    },
    // filterCard: {
    //     padding: 10,
    // },
    // filterCard_responsive: {
    //     padding: 0
    // }
}));

const Cocktail = ({ all_cocktails, all_categories, all_glasses, all_ingredients, all_alcohols, applyFilters,handleSearch }) => {
    const classes = useStyles();
    const [width, setWidth] = useState(null);
    const [cocktails, setCocktails] = useState([]);
    const [categories, setCategories] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [glasses, setGlasses] = useState([]);
    const [alcohols, setAlcohols] = useState([]);
    const [selected_category, setSelectedCategory] = useState("");
    const [selected_glass, setSelectedGlass] = useState("");
    const [selected_ingredient, setSelectedIngredient] = useState("");
    const [selected_alcohol, setSelectedAlcohol] = useState("");
    const [filterStr, setFilterStr] = useState("");
    //const [filters, setFilters] = useState(_filters);
    //const [selectedFilters, setSelectedFilters] = useState([]);
    let buttonSize = "medium";
    let cocktailCard = classes.cocktailCard;
    //let filterCard = classes.filterCard;

    useEffect(() => {
        if (all_cocktails) {
            setCocktails(all_cocktails)
        }
    }, [all_cocktails]);

    useEffect(() => {
        if (all_categories) {
            setCategories(all_categories)
        }
    }, [all_categories])

    useEffect(() => {
        if (all_glasses) {
            setGlasses(all_glasses)
        }
    }, [all_glasses])

    useEffect(() => {
        if (all_ingredients) {
            setIngredients(all_ingredients)
        }
    }, [all_ingredients])

    useEffect(() => {
        if (all_alcohols) {
            setAlcohols(all_alcohols)
        }
    }, [all_alcohols])

    useEffect(() => {
        if (window) {
            setWidth(window.innerHeight);
        }
    }, [])

    if (width < 700) {
        cocktailCard = classes.cocktailCard_responsive;
    }

    const returnFilterStr = (str, type, value) => {
        if (str.indexOf(type) > -1) {
            let arr = str.split(type);
            if (arr[1].indexOf('&') > -1) {
                let arr2 = arr[1].split(arr[1].charAt(arr[1].indexOf('&')));
                arr2[0] = value;
                str = arr[0] + type + arr2.join('&');
            }
            else {
                arr[1] = value;
                str = arr[0] + type + arr[1];
            }
        }
        else {
            str = str + (str.length > 0 ? "&" + type + value : type + value);
        }
        return str;

    }

    const handleApplyFilters = () => {
        let _filterStr = filterStr.slice();
        if (selected_category) {
            _filterStr = returnFilterStr(_filterStr, 'c=', selected_category);
        }
        if (selected_ingredient) {
            _filterStr = returnFilterStr(_filterStr, 'i=', selected_ingredient);
        }
        if (selected_glass) {
            _filterStr = returnFilterStr(_filterStr, 'g=', selected_glass);
        }
        if (selected_alcohol) {
            _filterStr = returnFilterStr(_filterStr, 'a=', selected_alcohol);
        }
        setFilterStr(_filterStr)
        applyFilters(_filterStr);
    }

    const handleResetFilters = () => {
        setSelectedCategory("");
        setSelectedGlass("");
        setSelectedIngredient('');
        setSelectedAlcohol('');
        setFilterStr('');
        applyFilters("");
    }
    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h4">
                        Cocktails
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Filters</FormLabel>
                        <Grid container>
                            <Grid item xs={3}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        Category
                                        </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={selected_category}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                    >
                                        <MenuItem value="">
                                            <em>Select Category</em>
                                        </MenuItem>
                                        {categories.map(category => (
                                            <MenuItem key={category.strCategory} value={category.strCategory}>{category.strCategory}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        Ingredient
                                        </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={selected_ingredient}
                                        onChange={(e) => setSelectedIngredient(e.target.value)}
                                    >
                                        <MenuItem value="">
                                            <em>Select Ingredient</em>
                                        </MenuItem>
                                        {ingredients.map(ingredient => (
                                            <MenuItem key={ingredient.strIngredient1} value={ingredient.strIngredient1}>{ingredient.strIngredient1}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        Glass
                                        </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={selected_glass}
                                        onChange={(e) => setSelectedGlass(e.target.value)}
                                    >
                                        <MenuItem value="">
                                            <em>Select Glass</em>
                                        </MenuItem>
                                        {glasses.map(glass => (
                                            <MenuItem key={glass.strGlass} value={glass.strGlass}>{glass.strGlass}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        Alcoholic
                                        </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={selected_alcohol}
                                        onChange={(e) => setSelectedAlcohol(e.target.value)}
                                    >
                                        <MenuItem value="">
                                            <em>Select Alcoholic</em>
                                        </MenuItem>
                                        {alcohols.map(alcohol => (
                                            <MenuItem key={alcohol.strAlcoholic} value={alcohol.strAlcoholic}>{alcohol.strAlcoholic}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Button variant="contained" color="primary" onClick={handleApplyFilters}>Apply Filters</Button>
                            <Button variant="contained" color="primary" onClick={handleResetFilters} style={{ marginLeft: 10 }}>Reset Filters</Button>
                        </Grid>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        label={"Search"}
                        style={{ marginRight: 10 }}
                        onChange={handleSearch}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                    />
                </Grid>
                <Grid item xs={12} >
                    <Grid container style={{ display: 'flex' }} >
                        <Grid item xs={12} md={12} sm={12} >
                            <Grid container style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {cocktails && cocktails.length > 0 && cocktails.map(cocktail => (
                                    <Grid key={cocktail.idDrink} item md={3} xs={12} sm={6} className={cocktailCard}>
                                        <Paper className={classes.paper}>
                                            <div style={{ textAlign: 'center' }}>
                                                <img src={cocktail.strDrinkThumb} className={classes.cocktailImage} />
                                            </div>
                                            <Typography variant="subtitle2" style={{ padding: 10, color: '#002884' }}>
                                                {cocktail.strDrink}
                                            </Typography>
                                            <Typography variant="subtitle2" style={{ padding: 10 }} >
                                                Ingredients:
                                                    <ul>
                                                    {cocktail.strIngredient1 && cocktail.strIngredient1.length > 0 && (
                                                        <li style={{ color: '#757ce8' }}>{cocktail.strIngredient1}</li>
                                                    )}
                                                    {cocktail.strIngredient2 && cocktail.strIngredient2.length > 0 && (
                                                        <li style={{ color: '#757ce8' }}>{cocktail.strIngredient2}</li>
                                                    )}
                                                    {cocktail.strIngredient3 && cocktail.strIngredient3.length > 0 && (
                                                        <li style={{ color: '#757ce8' }}>{cocktail.strIngredient3}</li>
                                                    )}
                                                    {cocktail.strIngredient4 && cocktail.strIngredient4.length > 0 && (
                                                        <li style={{ color: '#757ce8' }}>{cocktail.strIngredient4}</li>
                                                    )}
                                                </ul>
                                            </Typography>
                                            <Typography variant="subtitle2" style={{ padding: 10 }}>
                                                Glass: <span style={{ color: '#757ce8' }}>{cocktail.strGlass}</span>
                                            </Typography>
                                            <Typography variant="subtitle2" style={{ padding: 10 }}>
                                                Category: <span style={{ color: '#757ce8' }}>{cocktail.strCategory}</span>
                                            </Typography>
                                            <Typography variant="subtitle2" style={{ padding: 10 }}>
                                                Alcoholic/Non-Alcoholic: <span style={{ color: '#757ce8' }}>{cocktail.strAlcoholic}</span>
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div >
    )
}

export default Cocktail;