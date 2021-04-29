import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonText, IonTextarea, IonTitle, IonToolbar, withIonLifeCycle } from "@ionic/react";
import React from "react";
import { RouteComponentProps } from "react-router";
import "./New_Book.css";

interface Props {


}

interface RouteParams {

    authorId: any
}


export class NewBook extends React.Component<Props & RouteComponentProps<RouteParams>> {

    state = {};

    ionViewWillEnter() {
        const { authorId } = this.props.match.params;
        console.log(authorId);
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
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonItem className="ion-margin-bottom">
                                    <IonLabel position="stacked">Name</IonLabel>
                                    <IonInput type="text" name="name" placeholder="name"></IonInput>
                                </IonItem>
                                <IonItem className="ion-margin-bottom">
                                    <IonLabel position="stacked">Description</IonLabel>
                                    <IonTextarea name="description" placeholder="description"></IonTextarea>
                                </IonItem>
                                <IonButton expand="block" color="primary">Save</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        )
    }

}

export default withIonLifeCycle(NewBook);