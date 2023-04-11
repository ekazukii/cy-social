import Modal from "../Modal/Modal";
import React, { useState } from 'react';
import Input from "../Input/Input"
import Button from "../Button/Button";

/**
 * 
 * @param {Object} props
 * @param {Number} props.id 
 * @param {String} props.nameConv
 * @param {Object} props.userGroup  
 * @returns 
 */
export default function ParamConv(props){
    return (
        <>
            <Modal title={"Paramètre de conversation #"+props.id}
            children={
                <>
                    <Input 
                        type="text"
                        large={true}
                        placeholder="Nom de la conversation"
                        isValid={true}
                        value={props.nameConv}
                        label="test"
                    />
                    <Input 
                        type="text"
                        large={true}
                        placeholder="test"
                        label="test"
                    />
                    <Button text="Supprimer"/>
                    <Button text="Valider les modifications"/>
                </>
            }/>
        </>
    );
}