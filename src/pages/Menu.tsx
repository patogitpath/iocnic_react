import { add, home } from "ionicons/icons";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonMenu, IonItem, IonList, IonRouterOutlet, IonMenuToggle, IonLabel, IonIcon } from '@ionic/react';
import React from 'react';
import './Menu.css';

const Menu: React.FC = () => {


    return(
    <IonMenu side="start" menuId="AuthorMenu" contentId="content">
        <IonHeader>
        <IonToolbar color="primary">
            <IonTitle>Menu</IonTitle>
        </IonToolbar>
        </IonHeader>
        <IonContent>
        <IonList>
            <IonMenuToggle autoHide={true} >
                <IonItem routerLink={"/"} routerDirection="none">
                    <IonLabel>
                        <IonIcon slot="start" icon={home} className="ion-margin-end"></IonIcon>
                        Authors
                    </IonLabel>
                </IonItem>
                <IonItem routerLink={"/newauthor"} routerDirection="none">
                    <IonLabel>
                        <IonIcon slot="start" icon={add} className="ion-margin-end"></IonIcon>
                        New Author
                    </IonLabel>
                </IonItem>
            </IonMenuToggle>
        </IonList>
        </IonContent>
    </IonMenu>
    );

}

export default Menu;