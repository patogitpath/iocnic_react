import React, { Component } from "react";
import { createOutline, trash } from "ionicons/icons";
import { IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, withIonLifeCycle, useIonAlert, IonAlert } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Author_List.css';
import axios from "axios";
import links from "../services/links";
import { Link } from "react-router-dom";

export class AuthorList extends Component {

    state = {
        listAuthor: [],
        alertState: false,
        authorId: null

    };

    async ionViewWillEnter() {
        
        try {
            
            const data = await axios.post(links.getAllAuthor, {});
            this.setState({
                listAuthor: data.data.d
            });

        } catch (error) {
            console.log(error);
        }
    }

    async deleteAuthor(id: any) {

        try {
            
            const deleteData = {
                "id": id
            };

            const data = await axios.post(links.deleteAuthor, deleteData);
            console.log(data);
            this.setState({
                listAuthor: this.state.listAuthor.filter((a,i) => {
                    return a["id"] !== id
                })                
            });
        } catch (error) {
            console.log(error);
        }

    }

    render() {

        const alertas = (
            <IonAlert
                isOpen={ this.state.alertState }
                cssClass= "my-custom-class"
                header="Eliminar"
                message="Desea eliminar el autor"
                buttons={[
                    {
                        text: "cancel",
                        role: "Cancel",
                        handler: (blah) => {
                            this.setState({
                                alertState: false
                            });
                        }
                    },
                    {
                        text: "Ok",
                        handler: () => {
                            this.deleteAuthor(this.state.authorId);
                            this.setState({
                                alertState: false
                            });
                        }
                    }
                ]}
            ></IonAlert>
        );

        const authotRender = this.state.listAuthor.map((a, i) => {
            return(
                <IonItem key={i}>
                    <IonAvatar slot="start">
                        <img src="https://previews.123rf.com/images/indomercy/indomercy1701/indomercy170100075/68564332-creative-author-icon-color.jpg" alt="image" />
                    </IonAvatar>
                    <IonLabel>
                        <h2>{a["name"]}</h2>
                        <h3>{a["apellido"]}</h3>
                        <p>{a["edad"]}</p>
                    </IonLabel>
                    <IonButtons slot="end">
                        <Link to={"/edith-author/" + a["id"]} color="success">
                            <IonButton fill="clear" color="success">
                            <IonIcon icon={createOutline}></IonIcon>    
                            </IonButton>
                            
                        </Link>
                        <IonButton fill="clear" color="danger" onClick={() => { this.setState({alertState: true, authorId: a["id"]}) }}>
                            <IonIcon icon={trash}></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonItem>
            );
        });

        return(
            <IonPage>
                <IonHeader color="primary">
                    <IonToolbar color="primary">
                        <IonTitle>Autores</IonTitle>
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    {alertas}
                    <IonList>
                    {authotRender}
                    </IonList>
                </IonContent>
            </IonPage>
        );

    }
    
}

export default withIonLifeCycle(AuthorList);