import { Grid, Modal } from "@material-ui/core";
import Card from "../../../components/Card";

const { Item } = Grid

export default function Parterns({ parterns, handlePartern }) {
    return (
        <div style={{
            position: "absolute",
            left: "18%",
            top: "18%",
            width: "100%"
        }}>
            <div style={{
                backgroundColor: "black",
                color: "white",
                padding: "54px 60px 54px 60px",
                border: "2px #FF0000 solid",
                borderRadius: "20px",
                width: "60%",
                zIndex: "8",
            }}>
                <h1 className="h1">パータンのライブラリ</h1>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {parterns.map((partern, index) => {
                        return (
                            <Grid item xs={2} sm={4} md={2} key={index} >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center"
                                    }}
                                    onClick={() => handlePartern(partern)}
                                >
                                    <Card hide={true} srcImg={partern} />
                                </div>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        </div>
    )
}