import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonText, IonTextarea, IonTitle, IonToolbar, withIonLifeCycle } from "@ionic/react";
import axios from "axios";
import React from "react";
import { RouteComponentProps } from "react-router";
import links from "../services/links";
import "./New_Book.css";

interface Props {


}

interface RouteParams {

    authorId: any
}


export class NewBook extends React.Component<Props & RouteComponentProps<RouteParams>> {

    state = {

        idAuthor: "",
        name: "",
        description: ""

    };

    ionViewWillEnter() {

        const { authorId } = this.props.match.params;
        this.setState({
            idAuthor: authorId,
            name: "",
            description: ""
        });
        
    }


    changeText(e: any) {

        const { name, value } = e.target;
        this.setState({
            [name]: value
        });

    }

    async submitForm(e:any) {

        console.log(this.state);
        try {
            
            const dataForm = {
                author: this.state.idAuthor,
                name: this.state.name,
                description: this.state.description
            };

            const data = await axios.post(links.postNewBook, dataForm);
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
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/"></IonBackButton>
                        </IonButtons>
                        <IonTitle>New Book</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <form>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonItem className="ion-margin-bottom">
                                        <IonLabel position="stacked">Name</IonLabel>
                                        <IonInput type="text" name="name" value={ this.state.name } onIonChange={ this.changeText.bind(this) } placeholder="name"></IonInput>
                                    </IonItem>
                                    <IonItem className="ion-margin-bottom">
                                        <IonLabel position="stacked">Description</IonLabel>
                                        <IonTextarea name="description" value={ this.state.description } onIonChange={ this.changeText.bind(this) } placeholder="description"></IonTextarea>
                                    </IonItem>
                                    <IonButton expand="block" color="primary" onClick={ this.submitForm.bind(this) }>Save</IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </form>
                </IonContent>
            </IonPage>
        )
    }

}

export default withIonLifeCycle(NewBook);