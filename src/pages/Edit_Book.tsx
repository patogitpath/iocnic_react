import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTextarea, IonTitle, IonToolbar, withIonLifeCycle } from "@ionic/react";
import React from "react";
import { RouteComponentProps } from "react-router";
import "./Edit_Book.css";

interface Props {

}

interface RouteParams {

    id: any

}


export class EdithBook extends React.Component<Props & RouteComponentProps<RouteParams>> {



    ionViewWillEnter() {

        const { id } = this.props.match.params;
        console.log(id);

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

export default withIonLifeCycle(EdithBook);