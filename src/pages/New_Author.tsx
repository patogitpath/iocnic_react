import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonMenuToggle, IonPage, IonRow, IonTitle, IonToolbar, withIonLifeCycle } from "@ionic/react";
import axios from "axios";
import React, { Component } from "react";
import links from "../services/links";
import { Redirect, RouteComponentProps } from "react-router-dom";

interface Props {

}

export class NewAuthor extends Component<Props & RouteComponentProps> {

    state = {
        name: '',
        apellido: '',
        edad: ""
    };

    ionViewWillEnter() {
        console.log("gorm");
        this.setState({
            name: "",
            apellido: "",
            edad: ""
        });

    }

    changeText(e: any) {

        const {name, value} = e.target;
        this.setState({[name]: value});

    }

    async submitForm(e: any) {
        
        console.log(this.state);
        try {
            
            let author = {
                "name": this.state.name,
                "apellido": this.state.apellido,
                "edad": this.state.edad
            };

            const data = await axios.post(links.postNewAuthor, author);
            this.props.history.push("/");

        } catch (error) {
            
            console.log(error);
        }
    }

    render() {
        return(
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonTitle>New Author</IonTitle>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/"></IonBackButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <form>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonItem className="ion-margin-bottom">
                                        <IonLabel position="stacked">Name</IonLabel>
                                        <IonInput type="text" name="name" placeholder="name" value={this.state.name} onIonChange={this.changeText.bind(this)}></IonInput>
                                    </IonItem>
                                    <IonItem className="ion-margin-bottom">
                                        <IonLabel position="stacked">Apellido</IonLabel>
                                        <IonInput type="text" name="apellido" placeholder="apellido" value={this.state.apellido} onIonChange={this.changeText.bind(this)}></IonInput>
                                    </IonItem>
                                    <IonItem className="ion-margin-bottom">
                                        <IonLabel position="stacked">Edad</IonLabel>
                                        <IonInput type="number" name="edad" placeholder="edad" value={this.state.edad} onIonChange={this.changeText.bind(this)}></IonInput>
                                    </IonItem>
                                    <IonButton expand="block" color="primary"  onClick={this.submitForm.bind(this)}>Save</IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </form>
                </IonContent>
            </IonPage>
        );
    }
}

export default withIonLifeCycle(NewAuthor);