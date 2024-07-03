import matplotlib.pyplot as plt
import networkx as nx

def create_tls_diagram():
    G = nx.DiGraph()
    G.add_edge("Alice", "Server", label="Alice's public key")
    G.add_edge("Server", "Alice", label="Server's public key")
    G.add_edge("Alice", "Alice's Session Key", label="Generate")
    G.add_edge("Server", "Server's Session Key", label="Generate")
    G.add_edge("Alice", "Server", label="Ciphertext")
    G.add_edge("Server", "Alice", label="Ciphertext")

    pos = nx.spring_layout(G)
    plt.figure(figsize=(12, 8))
    nx.draw(G, pos, with_labels=True, node_color='lightblue', 
            node_size=3000, font_size=10, font_weight='bold')

    edge_labels = nx.get_edge_attributes(G, 'label')
    nx.draw_networkx_edge_labels(G, pos, edge_labels=edge_labels)

    plt.title("TLS Process Visualization", fontsize=16)
    plt.axis('off')
    plt.tight_layout()
    plt.show()

create_tls_diagram()