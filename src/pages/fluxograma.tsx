import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { useDisclosure } from "@mantine/hooks";

import "@mantine/core/styles.css";
import {
  MantineProvider,
  Grid,
  Stack,
  Button,
  SimpleGrid,
  Chip,
  Card,
  Image,
  rem,
  Text,
  Badge,
  Group,
  Modal,
  Title,
  Divider,
  List,
} from "@mantine/core";
import { IconX, IconCircleCheck } from "@tabler/icons-react";

interface IConteudo {
  nome: string;
  descricao?: string;
  url?: string;
}

interface IEmenta {
  conteudos: IConteudo[];
}

interface IReferenciaBibliografica {
  nome: string;
  url?: string;
  descricao?: string;
  tipo?: string;
}

interface IBibliografia {
  obrigatoria: IReferenciaBibliografica[];
  complementar: IReferenciaBibliografica[];
}

interface IDependencias {
    nome: string;
    url?: string;
}

interface IMateria {
  nome: string;
  horas: number;
  creditos: number;
  concluida?: boolean;
  ementa?: IEmenta;
  bibliografia?: IBibliografia;
  categorias?: string[];
  periodo?: number;
  departamento?: string;
  url?: string;
  dependencias?: IDependencias[];
}

interface IPeriodo {
  materias: IMateria[];
  nome: string;
}

interface IFluxograma {
  periodos: IPeriodo[];
  titulo: string;
}

const Materia = (materia: IMateria) => {
  const [opened, { open, close }] = useDisclosure(false);

  const icon = materia.concluida ? (
    <IconCircleCheck
      color="green"
      style={{
        width: "15%",
        height: "15%",
        position: "absolute",
        top: 10,
        right: 10,
      }}
    />
  ) : undefined;


  const ementa = {conteudos: [
    {nome: "Introdução à Engenharia de Software"},
    {nome: "Processos de Software"},
    {nome: "Modelos de Processos de Software"},
    {nome: "Engenharia de Requisitos"},
  ]}

  const periodo = 3

  const departamento = "Matemática"

  const bibliografia = {
    obrigatoria: [
      {nome: "Pressman, R. S. Engenharia de Software. 6ª ed. McGraw-Hill, 2006."},
      {nome: "Sommerville, I. Engenharia de Software. 9ª ed. Pearson, 2011."},
    ],
    complementar: [
      {nome: "Bezerra, E. Engenharia de Software. 2ª ed. Pearson, 2011."},
      {nome: "Briand, L. C. Engenharia de Software. LTC, 2005."},
    ]

  }

  const dependencias = [
    {nome: "Programação 1"},
    {nome: "Estrutura de Dados"},
  ]

  materia = {...materia, ementa, periodo, departamento, bibliografia, dependencias}

  return (
    <>
      <Modal
        opened={opened}
        title={<Title order={3}>{materia.nome}</Title>}
        onClose={close}
        centered
        size="auto"
      >
        <Divider />
        <br />
        <Stack gap="xs">
        <Badge color={materia.concluida ? "green" : "indigo"}>
          {materia.concluida ? "Concluído" : "Pendente"}
        </Badge>        

          <Text>
            Carga: {materia.creditos} créditos ({materia.horas} horas)
          </Text>
          {materia.periodo ? <Text>Período: {materia.periodo}º</Text> : null}
          {materia.departamento ? <Text>Departamento: {materia.departamento}</Text> : null}
          {materia.ementa ? (
            <Text>
              Ementa:{" "}
              <List withPadding listStyleType="disc">
                {materia.ementa.conteudos.map((item, index) => (
                  <List.Item key={index}>{item.nome}</List.Item>
                ))}
              </List>
            </Text>
          ) : null}

          {materia.categorias ? (
            <Text>
              Categorias:{" "}
              <List withPadding listStyleType="disc">
                {materia.categorias.map((item, index) => (
                  <List.Item key={index}>{item}</List.Item>
                ))}
              </List>
            </Text>
          ) : null}
          {materia.dependencias ? (
            <Text>
              Dependências:{" "}
              <List withPadding listStyleType="disc">
                {materia.dependencias.map((item, index) => (
                  <List.Item key={index}>{item.nome}</List.Item>
                ))}
              </List>
            </Text>
          ) : null}          
          {materia.bibliografia?.obrigatoria ? (
            <Text>
              Bibliografia Obrigatória:{" "}
              <List withPadding listStyleType="disc">
                {materia.bibliografia.obrigatoria.map((item, index) => (
                  <List.Item key={index}>{item.nome}</List.Item>
                ))}
              </List>
            </Text>
          ) : null}
          {materia.bibliografia?.complementar ? (
            <Text>
              Bibliografia Complementar:{" "}
              <List withPadding listStyleType="disc">
                {materia.bibliografia.complementar.map((item, index) => (
                  <List.Item key={index}>{item.nome}</List.Item>
                ))}
              </List>
            </Text>
          ) : null}          
        </Stack>

      </Modal>
      <Card
        shadow="sm"
        padding="sm"
        radius="md"
        withBorder
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderColor: materia.concluida ? "green" : undefined,
          borderWidth: materia.concluida ? 2 : undefined,
        }}
        onClick={open}
      >
        {icon}

        <Group justify="space-between" mt="sm" mb="xs" style={{ flexGrow: 1 }}>
          <Text
            lineClamp={2}
            size="md"
            style={{
              textOverflow: "ellipsis",
            }}
          >
            {materia.nome}
          </Text>
        </Group>
        <Text
          size="sm"
          c="dimmed"
          style={{
            margin: "auto 0 0 0", // Isso faz o texto se alinhar ao fundo do Card.
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {materia.horas} h - {materia.creditos} c
        </Text>
      </Card>
    </>
  );
};

const Periodo = (periodo: IPeriodo) => {
  // se todos elementos de materias possuem a propriedade concluida, retorna true
  const isPeriodoConcluido = periodo.materias.every(
    (materia) => materia.concluida
  );

  //se pelo menos uma materia do periodo foi concluida, retorna true
  const isPeriodoEmAndamento = periodo.materias.some(
    (materia) => materia.concluida
  );

  //color green se periodo concluido, yellow se em andamento e red se nao concluido
  const color = isPeriodoConcluido ? "green" : "indigo";

  const icon = isPeriodoConcluido ? undefined : (
    <IconX style={{ width: rem(16), height: rem(16) }} />
  );

  return (
    <Stack
      style={{ height: "100%" }} // Faz com que o Stack preencha todo o espaço vertical disponível
      gap="sm" // Espaçamento entre os Cards
    >
      <Chip
        defaultChecked={true}
        icon={icon}
        color={color}
        type="radio"
        radius="xs"
      >
        {periodo.nome}
      </Chip>
      {periodo.materias.map((materia, index) => (
        <Materia key={index} {...materia} />
      ))}
    </Stack>
  );
};

const Fluxograma = (fluxograma: IFluxograma) => {
  return (
    <SimpleGrid
      cols={fluxograma.periodos.length}
      style={{ width: "100%", height: "100%" }}
    >
      {fluxograma.periodos.map((periodo, index) => (
        <Periodo key={index} {...periodo} />
      ))}
    </SimpleGrid>
  );
};

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout description="Banco de conhecimento do Centro de Informática da UFPB">
      <MantineProvider>
        <Fluxograma
          titulo="Engenharia de Software"
          periodos={[
            {
              nome: "1º Período",
              materias: [
                {
                  nome: "Cálculo 1",
                  horas: 60,
                  creditos: 4,
                  concluida: true,
                },
                {
                  nome: "Introdução à Computação",
                  horas: 60,
                  creditos: 4,
                  concluida: true,
                },
                {
                  nome: "Leitura e Produção de Textos",
                  horas: 60,
                  creditos: 4,
                  concluida: true,
                },
                {
                  nome: "Álgebra Vetorial e Geometria Analítica",
                  horas: 60,
                  creditos: 4,
                  concluida: true,
                },
                {
                  nome: "Metodologia Científica",
                  horas: 60,
                  creditos: 4,
                  concluida: true,
                },
              ],
            },
            {
              nome: "2º Período",
              materias: [
                {
                  nome: "Cálculo 2",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Programação 1",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Teoria dos Grafos",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Física Geral",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Álgebra Linear",
                  horas: 60,
                  creditos: 4,
                },
              ],
            },
            {
              nome: "3º Período",
              materias: [
                {
                  nome: "Cálculo 3",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Programação 2",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Estrutura de Dados",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Probabilidade e Estatística",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Física Experimental",
                  horas: 60,
                  creditos: 4,
                },
              ],
            },
            {
              nome: "4º Período",
              materias: [
                {
                  nome: "Programação 3",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Banco de Dados",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Engenharia de Software 1",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Sistemas Operacionais",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Linguagens Formais e Autômatos",
                  horas: 60,
                  creditos: 4,
                },
              ],
            },
            {
              nome: "5º Período",
              materias: [
                {
                  nome: "Engenharia de Software 2",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Compiladores",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Redes de Computadores",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Inteligência Artificial",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Projeto de Software",
                  horas: 60,
                  creditos: 4,
                },
              ],
            },
            {
              nome: "6º Período",
              materias: [
                {
                  nome: "Engenharia de Software 3",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Sistemas Distribuídos",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Computação Gráfica",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Segurança de Dados",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Projeto de Software 2",
                  horas: 60,
                  creditos: 4,
                },
              ],
            },
            {
              nome: "7º Período",
              materias: [
                {
                  nome: "Engenharia de Software 4",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Estágio Supervisionado",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Optativa 1",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Optativa 2",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Optativa 3",
                  horas: 60,
                  creditos: 4,
                },
              ],
            },
            {
              nome: "8º Período",
              materias: [
                {
                  nome: "Projeto de Conclusão de Curso",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Optativa 4",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Optativa 5",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Optativa 6",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Optativa 7",
                  horas: 60,
                  creditos: 4,
                },
              ],
            },
          ]}
        />
      </MantineProvider>
    </Layout>
  );
}
