import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTextarea, IonTitle, IonToolbar, withIonLifeCycle } from "@ionic/react";
import axios from "axios";
import React from "react";
import { RouteComponentProps } from "react-router";
import links from "../services/links";
import "./Edit_Book.css";
import FormEdithBook from "./forms/Form_Edith_Book";

interface Props {

}

interface RouteParams {

    id: any

}


export class EdithBook extends React.Component<Props & RouteComponentProps<RouteParams>> {


    state = {

        bookId: '',
        authorId: '',
        name: '',
        description: '',
        bookObject: {},
        postState: false
    };


    async ionViewWillEnter() {

        const { id } = this.props.match.params;
        
        try {
            
            const data = await axios.post(links.getBookById, { id: id });
            this.setState({
                bookId: id,
                authorId: data.data.d.author,
                name: data.data.d.name,
                description: data.data.d.description,
                bookObject: {
                    bookId: id,
                    authorId: data.data.d.author,
                    name: data.data.d.name,
                    description: data.data.d.description
                },
                postState: true
            })

        } catch (error) {
            
            console.log(error);

        }

    }


    changeText(e: any) {

        const { name, value } = e.target;
        this.setState({
            [name]: value
        });

    }


    async submitForm(e: any) {

        try {
            
            const dataForm = {
                id: this.state.bookId,
                book: JSON.stringify({
                    author: this.state.authorId,
                    name: this.state.name,
                    description: this.state.description
                })
            };

            const data = await axios.post(links.postUpdateBook, dataForm);
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
                        <IonTitle>Edith Book</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12">
                                { this.state.postState ? <FormEdithBook author={ this.state.bookObject } /> : ''}
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    {/*<form>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonItem className="ion-margin-bottom">
                                        <IonLabel position="stacked">Name</IonLabel>
                                        <IonInput type="text" name="name" value={ this.state.name } onIonChange={ this.changeText.bind(this) } placeholder="name"></IonInput>
                                    </IonItem>
                                    <IonItem className="ion-margin-bottom">
                                        <IonLabel position="stacked">Description</IonLabel>
                                        <IonTextarea name="description" value={ this.state.description } placeholder="description" onIonChange={ this.changeText.bind(this) }></IonTextarea>
                                    </IonItem>
                                    <IonButton expand="block" color="primary" onClick={ this.submitForm.bind(this) }>Save</IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </form>*/}
                </IonContent>
            </IonPage>
        )
    }


}

export default withIonLifeCycle(EdithBook);