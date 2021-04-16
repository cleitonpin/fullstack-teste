import React from "react";
import Audio from '../../assets/sound.png'
import Image from '../../assets/image.png';
import Video from '../../assets/screen.png';
import Microfone from '../../assets/microfone.png';
import Camera from '../../assets/camera.png';
import Gravador from '../../assets/gravador.png';
import { IProduto } from "../../pages/landing";

import './style.css'

interface ProdutoProps {
    produto: IProduto;
}

const thumbnails: any = {
    "video": Video,
    "audio": Audio,
    "image": Image
}

const icon: any = {
    "video": Microfone,
    "audio": Camera,
    "image": Gravador
}

const Card: React.FC<ProdutoProps> = ({ produto }) => {
    let imagem = !produto.thumbnail ? thumbnails[produto.type] : produto.thumbnail;
    const value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.value as number);

    return (
        <div className="card">
            <div className="content">
                <div className="img">
                    <img src={imagem} alt="" />
                </div>
                <div className="circle">
                    <img src={icon[produto.type]} alt="" />
                </div>
            </div>
            <div className="values">
                <div className="info">
                    <p>{produto.name}</p>
                    <span>Nota: {produto.rating}</span>
                </div>
                <span>{value}</span>
            </div>
        </div>
    )
}


export default Card;