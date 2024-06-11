import { Image, Container, Title, Button, Group, Text, List, ThemeIcon, rem } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
//import image from './image.svg';
import classes from './HeroBullets.module.css';
import { TypeAnimation } from 'react-type-animation';

import ciPainelPNG from '@site/static/img/ci-painel.png'

export function HeroBullets() {
    return (
        <Container size="md">
            <div className={classes.inner}>
                <div className={classes.content}>
                    <Title className={classes.title}>
                        <TypeAnimation
                            sequence={[
                                // Same substring at the start will only be typed out once, initially
                                'convergencia.xyz',
                                2000, // wait 1s before replacing "Mice" with "Hamsters"
                                'Descubra',
                                1000,
                                'Compartilhe',
                                1000,
                                'Evolua',
                                1000
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                        />
                    </Title>

                    <List
                        mt={30}
                        spacing="sm"
                        size="sm"
                        icon={
                            <ThemeIcon size={20} radius="xl">
                                <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                            </ThemeIcon>
                        }
                    >
                        <List.Item>
                            <b>Acelere seu aprendizado</b> – Acesse uma vasta biblioteca de conteúdos e tutoriais criados por alunos e professores.
                        </List.Item>
                        <List.Item>
                            <b>Contrua mais rápido</b> – Compartilhe suas descobertas e truques, e colabore em projetos com colegas e professores.
                        </List.Item>
                        <List.Item>
                            <b>Foque no que realmente importa</b> – Encontre rapidamente o que você precisa para seus projetos e estudos.
                        </List.Item>
                        <List.Item>
                            <b>Mantenha-se atualizado</b> – Explore o que há de melhor no mercado.
                        </List.Item>
                    </List>
                </div>
                <Image src={ciPainelPNG} className={classes.image} />
            </div>
        </Container>
    );
}