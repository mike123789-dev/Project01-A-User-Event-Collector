//
//  TodayViewModel.swift
//  MiniVibe
//
//  Created by 강병민 on 2020/12/02.
//

import Foundation

class TodayViewModel: MiniVibeViewModel, ObservableObject {
    @Published var stations = [DJStation]()
    @Published var recommends = [Playlist]()
    @Published var favorites = [Playlist]()
    @Published var magazines = [Magazine]()
    @Published var tracks = [Track]()
    
    func fetchAll() {
        fetch(type: .favorites)
        fetch(type: .magazines)
        fetch(type: .recommendations)
        fetch(type: .playlists, id: 18)
    }
    
    
    func fetch(type: MiniVibeType, id: Int? = nil) {
        internalFetch(endPoint: type, id: id) { [weak self] data in
            switch type {
            case .magazines:
                if let decodedData = try? JSONDecoder().decode(Magazines.self, from: data) {
                    DispatchQueue.main.async {
                        self?.magazines = decodedData.magazines
                    }
                }
            case .djStations:
//                self?.stations = [DJStation(id: 1, imageName: nil)]
                break
            case .playlists:
                if let decodedData = try? JSONDecoder().decode(PlayListReponse.self, from: data) {
                    DispatchQueue.main.async {
                        if let tracks = decodedData.playlist.tracks {
                            self?.tracks = tracks
                        }
                    }
                }
            default:
                if let decodedData = try? JSONDecoder().decode(Playlists.self, from: data) {
                    DispatchQueue.main.async {
                        switch type{
                        case .favorites:
                            self?.favorites = decodedData.playlists
                        case .recommendations:
                            self?.recommends = decodedData.playlists
                        default:
                            return
                        }
                        
                    }
                }
            }
        }
        
    }
    
    
}
