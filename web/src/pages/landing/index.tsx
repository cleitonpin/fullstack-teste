import React, { useState, useEffect } from 'react';

import Bunny from '../../assets/Logo2.png';
import Lupa from '../../assets/lupa.png';
import ArrowDown from '../../assets/arrow-down.svg';
import ArrowTop from '../../assets/arrow-top.svg';

import './style.css';
import api from '../../services/api';
import { Skeleton } from '@material-ui/lab';
import Card from '../../components/Card';

export interface IProduto {
    _id: string,
    name: string,
    type: string,
    value: Number,
    rating: Number,
    thumbnail: string,
}

const Landing = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [filterSelected, setFilterSelected] = useState<boolean>(false);
    const [orderSelected, setOrderSelected] = useState<boolean>(false);
    const [data, setData] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [orderBy, setOrderBy] = useState<string>('newest');
    const [searchString, setSearchString] = useState<string>('')

    useEffect(() => {
        async function response() {
            const { data } = await api.get('/');
            setData(data);
        }
        response();
        setLoading(false);
    }, [])

    function handleFilterChanges(name: string): void {
        if(!selectedFilters.includes(name)) {
            setSelectedFilters([
                ...selectedFilters,
                name
            ]);
            return
        }
        let updatedFilters = selectedFilters.filter((x) => x !== name);
        setSelectedFilters(updatedFilters);
    }

    useEffect(() => {
        setLoading(true);
        api.get(`${searchString}?sort=${orderBy}`).then(({ data }) => {
            setData(data);
            setLoading(false);
        })
    }, [searchString, orderBy])

    return (
        <div>

            <div className="home">
                <div className="logo">
                    <img src={Bunny} alt="" />
                </div>
                <div className="description">
                    <h1>Bunny video browser</h1>
                    <p>Encontre os melhores videos aqui</p>
                </div>
            </div>
            <form>
                <div className="area-input">
                    <div className="input">
                        <input type="text" onChange={(e) => setSearchString(e.target.value)} placeholder="Procure seu produto" />

                        <button type="submit">
                            <img src={Lupa} alt="" />
                        </button>
                    </div>
                </div>
            </form>
            <div className="buttons">
                <div>
                    <span onClick={() => setFilterSelected(!filterSelected)} className="filterby">
                        Filtrar por
                        {filterSelected ? (
                            <img className="iconArrow" src={ArrowTop} alt=""/>) :
                            (<img className="iconArrow" src={ArrowDown} alt=""/>)
                        }
                    </span>
                    {filterSelected && (
                        <div id="filterBy" style={{display: 'block'}}>
                            <div className="filterByArea">
                                <span className={selectedFilters.includes('image') ? 'filterActive': ''} onClick={() => handleFilterChanges('image')}>Imagem</span>
                                <span className={selectedFilters.includes('video') ? 'filterActive': ''} onClick={() => handleFilterChanges('video')}>Video</span>
                                <span className={selectedFilters.includes('audio') ? 'filterActive': ''} onClick={() => handleFilterChanges('audio')}>Audio</span>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <span onClick={() => setOrderSelected(!orderSelected)} className="filterby">
                        Ordenar por
                        {orderSelected ? (
                            <img className="iconArrow" src={ArrowTop} alt=""/>) :
                            (<img className="iconArrow" src={ArrowDown} alt=""/>)
                        }
                    </span>
                    {orderSelected && (
                        <div id="filterBy" style={{display: 'block'}}>
                            <div className="filterByArea">
                                <span className={orderBy === 'newest' ? 'filterActive': ''} onClick={() => setOrderBy('newest')}>Mais novo</span>
                                <span className={orderBy === 'oldest' ? 'filterActive': ''} onClick={() => setOrderBy('oldest')}>Mais antigo</span>
                                <span className={orderBy === 'priceDown' ? 'filterActive': ''} onClick={() => setOrderBy('priceDown')}>Menor preço</span>
                                <span className={orderBy === 'priceUp' ? 'filterActive': ''} onClick={() => setOrderBy('priceUp')}>Maior preço</span>
                                <span className={orderBy === 'rating' ? 'filterActive': ''} onClick={() => setOrderBy('rating')}>Avaliações</span>
                            </div>
                        </div>
                    )}
                </div>

            </div>
            <div className="grid">
                { loading
                    ? (<Skeleton width={376} height={258} variant="rect" animation="wave" />)
                    : data.length > 0 ? selectedFilters.length === 0
                        ? data.map(produto => <Card produto={produto}/>)
                        : data.filter((item: IProduto) => selectedFilters.includes(item.type))
                                .map(produto => <Card produto={produto}/>) : 
                        (<p>Nenhum resultado encontrado.</p>)
                }
            </div>
        </div>

    );
}

export default Landing;