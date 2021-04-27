import React, { Component } from "react";
import { createOutline, trash } from "ionicons/icons";
import { IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Author_List.css';
import axios from "axios";

export class AuthorList extends Component {

    state = {
        listAuthor: []

    };

    async componentDidMount() {

        try {
            
            const data = await axios.post("http://localhost:51548/WebService1.asmx/GetAllBookJSON", {});
            const authorJson = JSON.parse(data["data"].d);
            this.setState({
                listAuthor: authorJson
            });

        } catch (error) {
            
        }

    }

    render() {


        const authotRender = this.state.listAuthor.map((a, i) => {
            return(
                <IonItem key={i}>
                    <IonAvatar>
                        <img src="https://previews.123rf.com/images/indomercy/indomercy1701/indomercy170100075/68564332-creative-author-icon-color.jpg" alt="image" />
                    </IonAvatar>
                    <IonLabel>{a["name"]}</IonLabel>
                    <IonButtons slot="end">
                        <IonButton fill="clear" color="success">
                            <IonIcon icon={createOutline}></IonIcon>
                        </IonButton>
                        <IonButton fill="clear" color="danger">
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
                  <IonList>
                      {authotRender}
                  </IonList>
                </IonContent>
            </IonPage>
        );

    }
    
}

export default AuthorList;