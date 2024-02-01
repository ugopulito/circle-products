//Page d'affichage de la liste des produits
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkForLocalPrice, defineCategoryColor } from '../helpers';
import { ProductClass } from '../classes';

import '../style/productList.scss'

const ProductList = () => {
    const [productsList, setProductsList] = useState([]);
    //Gestion de la navigation
    const navigate = useNavigate();
    const goToProduct = (id) => {
        navigate(`/products/${id}`)
    }
    //Fonction de récupération de la liste de produits
    const getProducts = () => {
        axios.get('https://fakestoreapi.com/products?limit=7')
          .then((res) => {
            const productsData = res.data.map((product) =>
                new ProductClass(
                  product.id,
                  product.title,
                  product.description,
                  product.image,
                  product.category,
                  checkForLocalPrice(product)//Vérification de la présence d'un prix modifié en local
                )
            );
            setProductsList(productsData);
          })
          .catch((err) => {
            console.error(err);
          });
      };
    
    useEffect(() => {
        getProducts()
    }, []);

    return (
        <section className='product-management'>
            <h1>Products management</h1>
            <table>
                <thead>
                    <tr>
                        <th className='product'>Product name</th>
                        <th className='category'>Category</th>
                        <th className='price'>Price</th>
                        <th className='price_vat'>Price (including VAT)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productsList.map((product) => (
                            <tr key={product.id} onClick={() => goToProduct(product.id)}>
                                <td className='product'>{product.title}</td>
                                <td className='category'><span className={defineCategoryColor(product.category)}>{product.category}</span></td>
                                <td className='price'>{product.price}€</td>
                                <td className='price_vat'>{product.getPriceWithVAT()}€</td>
                            </tr>
                        ))
                    }
                    
                </tbody>
            </table>
        </section>
    );
};

export default ProductList;