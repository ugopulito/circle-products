//Page de détails produit
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { defineCategoryColor, navigateToPreviousPage } from '../helpers';
import { ProductClass } from '../classes';

import '../style/product.scss'

const Product = () => {
    const { productId } = useParams();//Récupération de l'id produit via l'url
    const navigate = useNavigate();
    const [product, setProduct] = useState(new ProductClass());
    const [isPriceChanged, setIsPriceChanged] = useState(false);
    const [inputValue, setInputValue] = useState('')
    const { goBack } = navigateToPreviousPage();
    //Fonction de récupération des détails produit
    const getProductData = (id) => {
        axios
        .get(`https://fakestoreapi.com/products/${id}`)
        .then((res) => {
            const productData = res.data;
            const modifiedPrice = localStorage.getItem(`modifiedPrice${productId}`);
            setProduct(
                new ProductClass(
                    productData.id,
                    productData.title,
                    productData.description,
                    productData.image,
                    productData.category,
                    modifiedPrice ? modifiedPrice : productData.price
                )
            );
            setInputValue(modifiedPrice ? product.formatPrice(modifiedPrice) : product.formatPrice(productData.price));
        })
        .catch(error => {
            console.error(error);
        })
    };
    //Fonction de mise à jour du produit (ici uniquement le prix)
    const updateProduct = (id) => {
        axios
        .put(`https://fakestoreapi.com/products/${id}`, product)
        .then((res) => {
            console.log(res.data);
            setProduct(product.updateOldPrice(inputValue));
            setInputValue(product.formatPrice(inputValue));
            setIsPriceChanged(false);

            localStorage.setItem(`modifiedPrice${productId}`, inputValue);
        })
        .catch((err) => {
            console.error(err);
        })
    }
    //Gestion et vérification de l'input
    const handleInput = (e) => {
        const value = e.target.value;
        const isValidValue = !isNaN(value) && Number.isFinite(parseFloat(value));
        setInputValue(value);
        if (isValidValue && value >= 0 && product.formatPrice(value) != product.oldPrice) {
            const updatedPrice = product.updateRawPrice(value);
            setProduct(updatedPrice);
            setIsPriceChanged(true);
        } else {
            setIsPriceChanged(false);
        }
    };
    
    const handleClick = () => {
        updateProduct(productId);
    };

    useEffect(() => {
        getProductData(productId);
    }, [productId]);
    
    //Bride pour n'afficher que les produits dont l'id est compris entre 1 et 7
    if (productId > 7 || productId == 0) {
        throw new Error ('Ce produit n\'existe pas');
      }

    return (
        <section className='product-page'>
            <button onClick={goBack} className='back-button'><img src="/src/assets/back-button.svg" alt="Flèche de retour en arrière" /></button>
            
            <h1>{product.title}</h1>
            <div className="details">
                <div className="image-block">
                    <img src={product.image} alt={`Photo du produit ${product.title}`} />
                </div>
                <div className="description">
                    <h2>Description</h2>
                    <p>{product.description}</p>
                    <div className="price-section">
                        <h3>Price</h3>
                        <div className="price-update">
                            <div className="pu-input">
                                <input id='price' type="text" value={inputValue} onChange={handleInput} />
                                <i>€</i>
                            </div>
                            <span><strong>Price</strong> (including VAT): {product.getPriceWithVAT()}€</span>
                        </div>
                        <button onClick={handleClick} disabled={!isPriceChanged}>Update product</button>
                    </div>
                </div>
                <div className="category">
                    <h3>Category</h3>
                    <span className={defineCategoryColor(product.category)}>{product.category}</span>
                </div>
            </div>
        </section>
    );
};

export default Product;